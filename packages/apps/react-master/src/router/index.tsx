import React from 'react'
import { Outlet, RouteObject } from 'react-router-dom';
import Home from '../pages/home/index';
import Education from '../pages/education/index';
import RecommendList from '../pages/home/tabs/recommendList';

export interface extraBizObject {
    title?: string;
    // children?: Array<ZHRouter>
}

export type ZHRouter = RouteObject & extraBizObject

export const router: Array<ZHRouter> = [
    {
        path: '/',
        element: <Home />,
        title: '首页',
        children: [
            {
                path: '',
                element: <RecommendList />
            },
            { path: 'follow', element: <div><Outlet />关注Tab</div> },
            { path: 'hot', element: <div>热榜</div> },
            { path: 'zvideo', element: <div>视频</div> }
        ]
    },
    {
        path: '/education', element: <Education />, title: '知乎知学堂',
        children: [
            { path: 'test2', element: <div>教育</div>}
        ]
    },
    {
        path: '/explore', element: <div>发现</div>, title: '发现',
    },
    {
        path: '/question', element: <div>等你来答</div>, title: '等你来答',
        children: [
            { path: 'learning', element: <div>为你推荐</div>}
        ]
    },
]