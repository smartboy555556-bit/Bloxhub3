'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/Logo';

'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { GAMES_CATALOG } from '@/lib/gamesCatalog';
import Logo from '@/components/Logo';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [refCodeInput, setRefCodeInput] = useState('');
  const [coinsToBuy, setCoinsToBuy] = useState(100);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [visibleCount, setVisibleCount] = useState(30);
  const [loadingPay, setLoadingPay] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ref')) {
      setRefCodeInput(params.get('ref'));
      setIsSignUp(true);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      }
    });

    supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50)
      .then(({ data }) => setMessages(data || []));

    const channel = supabase
      .channel('public:chat_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const loadProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    setProfile(data);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      let referrerId = null;
      if (refCodeInput) {
        const { data: refUser } = await supabase
          .from('profiles')
          .select('id')
          .eq('referral_code', refCodeInput.trim().toUpperCase())
          .single();
        if (refUser) referrerId = refUser.id;
      }

      const { data: authData, error } = await supabase.auth.signUp({ email, password });
      if (error) return alert(error.message);

      const startingCoins = referrerId ? 55 : 5;
      const myRefCode = username.toUpperCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900);

      await supabase.from('profiles').insert({
        id: authData.user.id,
        username,
        referral_code: myRefCode,
        referred_by: referrerId,
        coin_balance: startingCoins,
        coin_unit_price_ngn: 13.00
      });

      if (referrerId) {
        await supabase.rpc('increment_coins', { user_id_input: referrerId, amount_input: 100 });
      }
      window.location.reload();
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return alert(error.message);
      window.location.reload();
    }
  };

  const handleBuyCoins = async () => {
    setLoadingPay(true);
    const res = await fetch('/api/paystack/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, email: user.email, coinsToBuy })
    });
    const data = await res.json();
    setLoadingPay(false);
    if (data.authorization_url) window.location.href = data.authorization_url;
    else alert(data.error || 'Payment failed to initialize');
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !profile) return;
    await supabase.from('chat_messages').insert({
      user_id: user.id,
      username: profile.username,
      message: chatInput
    });
    setChatInput('');
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <Logo />
        <p className="text-yellow-400 text-sm font-semibold mt-2">Sign up today & get 5 FREE Coins + 350 Games!</p>
        <form onSubmit={handleAuth} className="bg-slate-900 p-6 rounded-xl w-full max-w-md mt-4 space-y-4 border border-slate-800">
          <h2 className="text-xl font-bold">{isSignUp ? 'Create Player Account' : 'Player Login'}</h2>
          {isSignUp && (
            <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2.5 rounded bg-slate-800 border border-slate-700" />
          )}
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 rounded bg-slate-800 border border-slate-700" />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2.5 rounded bg-slate-800 border border-slate-700" />
          {isSignUp && (
            <input type="text" placeholder="Referral Code (Optional)" value={refCodeInput} onChange={(e) => setRefCodeInput(e.target.value)} className="w-full p-2.5 rounded bg-slate-800 border border-slate-700" />
          )}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-2.5 rounded font-bold">
            {isSignUp ? 'Sign Up & Claim 5 Free Coins' : 'Login'}
          </button>
          <p onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-center text-slate-400 cursor-pointer">
            {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
          </p>
        </form>
      </div>
    );
  }

  const genres = ['All', 'Roleplay', 'Action', 'Parkour', 'Tycoon', 'Survival', 'Adventure'];
  const filteredGames = GAMES_CATALOG.filter((g) => {
    const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || g.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 gap-4">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full font-bold">
            🪙 {profile.coin_balance} Coins
          </span>
          {profile.role === 'admin' && (
            <a href="/admin" className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded font-semibold text-sm">Admin Panel</a>
          )}
          <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-sm text-slate-400 hover:text-white">Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg">Buy Coins (Your Rate: ₦{profile.coin_unit_price_ngn}/coin)</h3>
              <p className="text-xs text-slate-400 mt-1">
                Referral Link: <span className="text-blue-400 select-all">{typeof window !== 'undefined' ? window.location.origin : ''}/?ref={profile.referral_code}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" min="10" value={coinsToBuy} onChange={(e) => setCoinsToBuy(e.target.value)} className="w-24 p-2 rounded bg-slate-800 border border-slate-700" />
              <button disabled={loadingPay} onClick={handleBuyCoins} className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-bold">
                {loadingPay ? 'Loading...' : `Pay ₦${coinsToBuy * profile.coin_unit_price_ngn}`}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h3 className="font-bold text-lg">All 350 Experiences ({filteredGames.length} matching)</h3>
              <input
                type="text"
                placeholder="Search 350 games..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(30);
                }}
                className="p-2 rounded bg-slate-800 border border-slate-700 text-sm w-56"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    setSelectedGenre(genre);
                    setVisibleCount(30);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedGenre === genre ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[680px] overflow-y-auto pr-1">
              {filteredGames.slice(0, visibleCount).map((game) => (
<div className={h-28 bg-gradient-to-br ${game.color} flex items-center justify-center font-bold text-base text-center p-2}>
{game.title}



{game.genre}
👤 {game.players}

<a
href={/play?mode=${game.mode}&title=${encodeURIComponent(game.title)}}
className="w-full text-center bg-blue-600 hover:bg-blue-500 py-1.5 rounded text-sm font-bold"
>
Play Now



))}
{visibleCount < filteredGames.length && (
<button
onClick={() => setVisibleCount((c) => c + 30)}
className="w-full mt-4 bg-slate-800 hover:bg-slate-700 py-2.5 rounded-lg text-sm font-bold text-blue-400"
>
Load More Games ({filteredGames.length - visibleCount} remaining)

)}

Global Player Chat (Numbers Allowed)

{messages.map((m) => (

{m.username}: 
{m.message}

))}


<input type="text" placeholder="Type message or numbers..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 p-2 rounded bg-slate-800 border border-slate-700 text-sm" />
Send




);
}

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [refCodeInput, setRefCodeInput] = useState('');
  const [coinsToBuy, setCoinsToBuy] = useState(100);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loadingPay, setLoadingPay] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ref')) {
      setRefCodeInput(params.get('ref'));
      setIsSignUp(true);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      }
    });

    supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50)
      .then(({ data }) => setMessages(data || []));

    const channel = supabase
      .channel('public:chat_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const loadProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    setProfile(data);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      let referrerId = null;
      if (refCodeInput) {
        const { data: refUser } = await supabase
          .from('profiles')
          .select('id')
          .eq('referral_code', refCodeInput.trim().toUpperCase())
          .single();
        if (refUser) referrerId = refUser.id;
      }

      const { data: authData, error } = await supabase.auth.signUp({ email, password });
      if (error) return alert(error.message);

      const startingCoins = referrerId ? 55 : 5;
      const myRefCode = username.toUpperCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900);

      await supabase.from('profiles').insert({
        id: authData.user.id,
        username,
        referral_code: myRefCode,
        referred_by: referrerId,
        coin_balance: startingCoins,
        coin_unit_price_ngn: 13.00
      });

      if (referrerId) {
        await supabase.rpc('increment_coins', { user_id_input: referrerId, amount_input: 100 });
      }
      window.location.reload();
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return alert(error.message);
      window.location.reload();
    }
  };

  const handleBuyCoins = async () => {
    setLoadingPay(true);
    const res = await fetch('/api/paystack/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, email: user.email, coinsToBuy })
    });
    const data = await res.json();
    setLoadingPay(false);
    if (data.authorization_url) window.location.href = data.authorization_url;
    else alert(data.error || 'Payment failed to initialize');
};
const sendMessage = async (e) => {
e.preventDefault();
if (!chatInput.trim() || !profile) return;
await supabase.from('chat_messages').insert({
user_id: user.id,
username: profile.username,
message: chatInput
});
setChatInput('');
};
if (!user || !profile) {
return (


Sign up today & get 5 FREE Coins instantly!

{isSignUp ? 'Create Player Account' : 'Player Login'}
{isSignUp && (
<input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2.5 rounded bg-slate-800 border border-slate-700" />
)}
<input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 rounded bg-slate-800 border border-slate-700" />
<input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2.5 rounded bg-slate-800 border border-slate-700" />
{isSignUp && (
<input type="text" placeholder="Referral Code (Optional)" value={refCodeInput} onChange={(e) => setRefCodeInput(e.target.value)} className="w-full p-2.5 rounded bg-slate-800 border border-slate-700" />
)}

{isSignUp ? 'Sign Up & Claim 5 Free Coins' : 'Login'}

<p onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-center text-slate-400 cursor-pointer">
{isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}



);
}
const genres = ['All', 'Roleplay', 'Action', 'Parkour', 'Tycoon', 'Survival', 'Adventure'];
const filteredGames = GAMES_CATALOG.filter((g) => {
const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase());
const matchesGenre = selectedGenre === 'All' || g.genre === selectedGenre;
return matchesSearch && matchesGenre;
});
return (
🪙 {profile.coin_balance} Coins

{profile.role === 'admin' && (
Admin Panel
)}
<button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-sm text-slate-400 hover:text-white">Logout

Buy Coins (Your Rate: ₦{profile.coin_unit_price_ngn}/coin)

Referral Link: {typeof window !== 'undefined' ? window.location.origin : ''}/?ref={profile.referral_code}



<input type="number" min="10" value={coinsToBuy} onChange={(e) => setCoinsToBuy(e.target.value)} className="w-24 p-2 rounded bg-slate-800 border border-slate-700" />

{loadingPay ? 'Loading...' : Pay ₦${coinsToBuy * profile.coin_unit_price_ngn}}


All 50 Experiences ({filteredGames.length})
<input
type="text"
placeholder="Search 50 games..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="p-2 rounded bg-slate-800 border border-slate-700 text-sm w-56"
/>
{genres.map((genre) => (
<button
key={genre}
onClick={() => setSelectedGenre(genre)}
className={px-3 py-1 rounded-full text-xs font-bold ${ selectedGenre === genre ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white' }}
>
{genre}

))}
{filteredGames.map((game) => (

<div className={h-28 bg-gradient-to-br ${game.color} flex items-center justify-center font-bold text-base text-center p-2}>
{game.title}



{game.genre}
👤 {game.players}

<a
href={/play?mode=${game.mode}&title=${encodeURIComponent(game.title)}}
className="w-full text-center bg-blue-600 hover:bg-blue-500 py-1.5 rounded text-sm font-bold"
>
Play Now



))}


Global Player Chat (Numbers Allowed)

{messages.map((m) => (

{m.username}: 
{m.message}

))}


<input type="text" placeholder="Type message or numbers..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 p-2 rounded bg-slate-800 border border-slate-700 text-sm" />
Send




);
}
