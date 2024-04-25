import React, { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
// import { useRefInsObsEffect } from './recommendList';

type Props = {
    onChange : (bool: Boolean) => void;
}

const tabs = [
    { name: "关注", to:'/follow' },
    { name: "推荐", to:'/' },
    { name: "热榜", to:'/hot' },
    { name: "视频", to:'/zvideo' },
];

export const PureTab = () => tabs.map((item) => <NavLink 
    key={item.name}
    to={item.to}
    className={({ isActive }) => " whitespace-nowrap p-4 text-base transition-all " + (
        isActive ? "text-blue-600 font-bold": "text-balck hover: text-blue-900"
    )}
    >
        {item.name}
    </NavLink>)

function Tabs({ onChange }: Props) {

    const scrollRef = useRef<HTMLDivElement>(null);

    // 当我们这个 scrollRef 在屏幕中不显示的时候，我们进行切换；
    // 如何判断；
    // 1. getBoundingClientRect();
    // 2. intersectionObserver 

    // useRefInsObsEffect(onChange, scrollRef)

    useEffect(() => {
        let intersectionObserver: IntersectionObserver|undefined = new IntersectionObserver((entries) => {
            onChange?.(entries[0]?.isIntersecting)
        });

        scrollRef.current && intersectionObserver.observe(scrollRef.current);

        return () => {
            scrollRef.current && intersectionObserver?.unobserve(scrollRef.current);
        }
    })

  return (
    <div className='w-full'>
        <div ref={scrollRef}></div>
        <div className='flex mx-6 box-border'>
            <PureTab />
        </div>
        <Outlet />
    </div>
  )
}

export default Tabs