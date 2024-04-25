import React, { FC, MouseEventHandler, RefObject, useEffect, useRef, useState } from 'react';

type Props = {}

interface ItemProps {
    item: any
}

const RecommendData: FC<ItemProps> = ({ item }) => {

    const [ selected, setSelected ] = useState<boolean>(false);

    const handleClick: MouseEventHandler<Element> = (event) => {
        event?.preventDefault();
        setSelected(val => !val);
    }

    const href = item?.target?.type === "answer" ?
        `https://www.zhihu.com/question/${item?.target?.question?.id}/answer/${item?.target?.id}`:
        `https://zhuanlan.zhihu.com/p/${item?.target?.id}`;

    return <div className='flex flex-col items-start p-4 border-t'>
        {/* 标题部分 */}
        <div className='h-auto flex justify-start'>
            <a 
                className='font-bold text-black text-lg leading-10'
                target='_blank'
                href={href}
            >
                {
                    item?.target?.question?.title || item?.target?.title
                }
            </a>
        </div>

        {/* 文章内容部分 */}
        {
            selected ?<div dangerouslySetInnerHTML={{ __html: item?.target?.content}}></div>
            : <a
            href='/'
            onClick={handleClick}
            className=' cursor-pointer text-slate-800 hover:text-slate-500'
            >
                { item?.target?.excerpt } <span
                className='text-sm leading-7 text-blue-500 hover:text-slate-500'
                >阅读全文 &gt;</span>
            </a>
        }

        {/* 底bar */}
        <div className={`flex bg-white w-full ${selected ? "bottom-0  border-t sticky" : ''}`}>
            <div className='h-10 rounded-sm bg-blue-100 text-blue-500 p-2 m-2 inline-flex'>
                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    赞同
                </span>
            </div>
            <div className='h-10 rounded-sm bg-blue-100 text-blue-500 p-2 m-2 inline-flex'>
                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                </span>
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                &nbsp; {item?.target?.comment_count} 条评论
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                收藏
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                喜欢
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                分享
            </div>
            {
                selected && <div
                    onClick={handleClick}
                    className='text-base text-gray-400 p-2 m-2 inline-flex cursor-pointer'>
                    <span className='inline-flex'>收起</span>
                </div>
            }
        </div>

    </div>
}

export default function recommendList({}: Props) {
  return (
    <div>recommendList</div>
  )
}