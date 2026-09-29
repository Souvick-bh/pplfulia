"use client";

import { useState, useRef } from "react";

const history = [
  {
    title: "Kasukabe Defence Group",
    date: "21 March 2020",
    description: "The beginning of the community and foundation.",
    tag: "Inception",
  },
  {
    title: "PPL Season 1",
    date: "22 October 2020",
    description: "Inaugural league launch with 3 teams.",
    tag: "League",
  },
  {
    title: "PPL Season 2",
    date: "11 October 2021",
    description: "Expanded format and live community streams.",
    tag: "Major Event",
  },
  {
    title: "PPL Season 3",
    date: "1 October 2022",
    description: "Record prize pool and international reach.",
    tag: "Milestone",
  },
  {
    title: "PPL Season 4",
    date: "20 October 2023",
    description: "Introduced double-elimination bracket system.",
    tag: "Tournament",
  },
  {
    title: "PPL Season 5",
    date: "9 October 2024",
    description: "The biggest competitive season to date.",
    tag: "Current Era",
  },
];


export default function HistoryFramer() {

  const [showHistory, setShowHistory] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);


  const scrollToNode = (index:number)=>{

    setActiveIndex(index);

    scrollContainerRef.current?.scrollTo({
      left:index * 294,
      behavior:"smooth"
    });

  };


return (

<section
className="
mx-auto
flex
w-full
max-w-6xl
flex-col
items-center
overflow-hidden
px-4
py-8
"
>


<button

onClick={()=>setShowHistory(v=>!v)}

className="
flex
items-center
gap-3

border-4
border-black

bg-yellow-300

px-6
py-3

text-xl
font-black
uppercase

shadow-[6px_6px_0_black]

transition-all

hover:-translate-x-1
hover:-translate-y-1

hover:shadow-[10px_10px_0_black]

active:translate-x-1
active:translate-y-1
active:shadow-none
"

>

Timeline & History

<span
className={`
transition-transform
${showHistory ? "rotate-180":"rotate-0"}
`}
>
↓
</span>

</button>



{showHistory && (

<div
className="
mt-10
w-full
"
>


{/* Progress */}

<div
className="
mb-8
flex
justify-center
gap-3
"
>

{
history.map((item,index)=>(

<button

key={item.title}

onClick={()=>scrollToNode(index)}

className={`
h-3
border-2
border-black

transition-all

${
activeIndex===index
?
"w-10 bg-red-400"
:
"w-3 bg-white"
}

`}

/>

))

}

</div>




<div
className="
relative
"
>


<div
className="
absolute
top-1/2
left-0
h-1
w-full
bg-black
"
/>



<div

ref={scrollContainerRef}

className="
relative
flex
gap-8
overflow-x-auto
snap-x
snap-mandatory

px-8
py-6

scrollbar-none
"

>



{
history.map((item,index)=>{

const active=activeIndex===index;


return (

<div

key={item.title}

onClick={()=>setActiveIndex(index)}

className="
snap-center
shrink-0
w-[270px]

cursor-pointer

"

>


<div

className={`

border-4
border-black

p-5

bg-white

shadow-[8px_8px_0_black]

transition-all

hover:-translate-y-2

${
active
?
"bg-red-200 -translate-y-2"
:
""
}

`}

>


<div
className="
flex
justify-between
items-center
mb-4
"
>

<span
className="
border-2
border-black

bg-yellow-300

px-2
py-1

text-xs
font-black
"
>

#{String(index+1).padStart(2,"0")}

</span>


<span
className="
font-mono
text-xs
font-bold
"
>
{item.date}
</span>


</div>




<h3
className="
text-xl
font-black
uppercase
leading-tight
"
>
{item.title}
</h3>


<p
className="
mt-3
text-sm
font-medium
"
>
{item.description}
</p>




<div
className="
mt-5

border-t-4
border-black

pt-3

flex
justify-between
items-center
"
>

<span
className="
bg-green-300

border-2
border-black

px-2
py-1

text-xs
font-black
uppercase
"
>

{item.tag}

</span>



<div
className={`
h-4
w-4
border-2
border-black

${
active
?
"bg-red-500"
:
"bg-white"
}

`}
/>


</div>



</div>

</div>

)

})

}


</div>


</div>


</div>

)}


</section>

);

}