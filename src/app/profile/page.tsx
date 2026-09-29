"use client"
import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import {RiArrowGoBackLine} from 'react-icons/ri'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {Heart} from "lucide-react"
import { supabase2 } from '@/api/user';


const Profile = () => {
  const { user } = useAuth();
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    achievements: '',
    role: 'member' as 'member' | 'player' | 'owner',
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  React.useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        achievements: profile.achievements || '',
        role: profile.role,
      });
    }
  }, [profile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        achievements: profile.achievements || '',
        role: profile.role,
      });
    }
  };

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  async function handleSignOut() {
    const {error} = await supabase2.auth.signOut()
    router.replace('/auth');
    if (error) {
      console.log(error)
    }
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const avatarUrl = await uploadAvatar(file);
      if (avatarUrl) {
        await updateProfile({ avatar_url: avatarUrl });
    } 
    } catch (error) {
        console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'text-[#F4A004]';
      case 'player':
        return 'text-[#beee62]';
      case 'member':
      default:
        return 'text-[#7e52a0]';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <img src='/icons/richmonkey.jpg' className="h-5 w-5 rounded-[50%]" />;
      case 'player':
        return <img src='/icons/playermonkey.jpg' className="h-5 w-5 rounded-[50%]" />;
      default:
        return <img src='/icons/membermonkey.jpg' className="h-5 w-5 rounded-[50%]" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  const handleRoleChange = (value: 'member' | 'player' | 'owner') => {
    setFormData({ ...formData, role: value })
  };

   if (!profile) {
  return (
    <div
      className="
      min-h-screen
      w-full

      bg-[#f5f0e8]

      flex
      items-center
      justify-center

      px-4
      "
    >

      <div
        className="
        border-4
        border-black

        bg-white

        p-10

        text-center

        shadow-[10px_10px_0_black]

        "
      >

        <h2
          className="
          text-4xl
          font-black
          uppercase
          mb-4
          "
        >
          Profile Not Found
        </h2>


        <p
          className="
          font-bold
          uppercase
          text-sm
          "
        >
          Create your player profile to join PPL
        </p>


        <div
          className="
          mt-6
          inline-block

          border-4
          border-black

          bg-red-300

          px-4
          py-2

          font-black
          uppercase
          "
        >
          Error 404
        </div>

      </div>

    </div>
  );
}

return (

<div
className="
min-h-screen
w-full

bg-[#f5f0e8]

flex
justify-center

px-4
py-10
"
>


<Link href="/">

<button

className="
fixed
top-5
left-5

border-4
border-black

bg-yellow-300

p-3

shadow-[5px_5px_0_black]

hover:-translate-y-1
hover:-translate-x-1

transition-all

active:shadow-none

"

>

<RiArrowGoBackLine size={22}/>

</button>

</Link>




<div

className="
w-full
max-w-3xl

border-4
border-black

bg-white

p-6
md:p-10

shadow-[12px_12px_0_black]

"

>



<div

className="
flex
justify-between
items-center

border-b-4
border-black

pb-5
mb-8

"

>

<h1

className="
text-4xl
font-black
uppercase
"

>

MY PROFILE

</h1>



{
!isEditing ?

<button

onClick={handleEdit}

className="
border-4
border-black

bg-yellow-300

px-4
py-2

font-black
uppercase

shadow-[4px_4px_0_black]

active:translate-x-1
active:translate-y-1
active:shadow-none

"

>

EDIT

</button>


:

<div className="flex gap-3">


<button

onClick={handleSave}

className="
border-4
border-black
bg-green-300
px-4
py-2
font-black
shadow-[4px_4px_0_black]
"

>
SAVE
</button>


<button

onClick={handleCancel}

className="
border-4
border-black
bg-red-300
px-4
py-2
font-black
shadow-[4px_4px_0_black]
"

>
CANCEL
</button>


</div>

}


</div>






{/* Avatar section */}


<div
className="
flex
flex-col
md:flex-row

items-center

gap-8

"

>


<div
className="
relative
"

>


<div

className="
h-32
w-32

border-4
border-black

overflow-hidden

bg-yellow-200

shadow-[6px_6px_0_black]

"

>

<img

src={
profile.avatar_url ||
"/icons/membermonkey.jpg"
}

className="
h-full
w-full
object-cover
"

/>


</div>




{
isEditing && (

<button

onClick={()=>fileInputRef.current?.click()}

className="
absolute
bottom-[-15px]
left-1/2

-translate-x-1/2

border-4
border-black

bg-red-300

px-3
py-1

font-black
text-xs

"

>

CHANGE

</button>

)

}


<input

ref={fileInputRef}

type="file"

accept="image/*"

onChange={handleAvatarUpload}

className="hidden"

/>


</div>




<div>


<h2

className="
text-3xl
font-black
uppercase
"

>

{
profile.display_name ||
"Anonymous Fan"
}

</h2>



<div

className="
mt-3

inline-block

border-4
border-black

bg-green-300

px-3
py-1

font-black
uppercase

"

>

{profile.role}

</div>




<div
className="
mt-4
font-bold
"

>

❤️ {profile.likes_count || 0} Likes

</div>


<div
className="
font-bold
"

>

Joined {new Date(profile.created_at).toLocaleDateString()}

</div>



</div>


</div>






{/* Details */}


<div

className="
mt-10

grid

gap-5

"

>



<div>

<label className="font-black uppercase">
Name
</label>


{
isEditing ?

<input

value={formData.display_name}

onChange={(e)=>setFormData({
...formData,
display_name:e.target.value
})}

className="
mt-2

w-full

border-4
border-black

p-3

font-bold

bg-yellow-100

"

/>

:

<p className="font-bold mt-2">

{profile.display_name || "Not set"}

</p>

}

</div>







<div>

<label className="font-black uppercase">
Role
</label>


{
isEditing ?

<select

value={formData.role}

onChange={e=>handleRoleChange(
e.target.value as any
)}

className="
mt-2
border-4
border-black
p-3
font-bold
bg-white
"

>

<option value="member">
Member
</option>

<option value="player">
Player
</option>

<option value="owner">
Owner
</option>


</select>


:

<p
className="
mt-2
font-black
uppercase
"

>

{profile.role}

</p>

}

</div>






<div>


<label className="font-black uppercase">
Bio
</label>


{
isEditing ?

<textarea

rows={3}

value={formData.bio}

onChange={e=>setFormData({
...formData,
bio:e.target.value
})}

className="
mt-2
w-full

border-4
border-black

p-3

font-bold

"

/>

:

<p className="mt-2 font-bold">

{
profile.bio ||
"No bio yet"
}

</p>

}


</div>






<div>


<label className="font-black uppercase">
Achievements
</label>


{
isEditing ?

<textarea

rows={3}

value={formData.achievements}

onChange={e=>setFormData({
...formData,
achievements:e.target.value
})}

className="
mt-2
w-full

border-4
border-black

p-3

font-bold

"

/>

:

<p className="mt-2 font-bold">

{
profile.achievements ||
"No achievements"
}

</p>

}


</div>



</div>





<button

onClick={handleSignOut}

className="
mt-10

border-4
border-black

bg-red-400

px-6
py-3

font-black

uppercase

shadow-[5px_5px_0_black]

hover:-translate-y-1

active:shadow-none

"

>

SIGN OUT

</button>




</div>


</div>

)
};

export default Profile;

