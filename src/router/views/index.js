import Layout from '@/page/index/'
export default [{
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
        path: 'index',
        name: '首页',
        component: () =>
            import ( /* webpackChunkName: "views" */ '@/page/wel')
    }]
}, {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [{
        path: 'index',
        name: '个人信息',
        component: () =>
            import ( /* webpackChunkName: "page" */ '@/views/admin/user/info'),
    }]
},{
    path: '/modelMng',
    component: Layout,
    redirect: '/modelMng/index',
    children: [{
        path: 'index',
        name: '模型管理',
        component: () =>
            import ( /* webpackChunkName: "page" */ '@/views/model/modelMng/index'),
    },{
        path: 'detail',
        name: '模型注册',
        component: () =>
            import ( /* webpackChunkName: "page" */ '@/views/model/modelMng/detail'),
    }]
},{
    path: '/modelRun',
    component: Layout,
    redirect: '/modelRun/index',
    children: [{
        path: 'index',
        name: '模型运行管理',
        component: () =>
            import ( /* webpackChunkName: "page" */ '@/views/model/modelRun/index'),
    }]
},{
    path: '/modelEva',
    component: Layout,
    children: [{
        path: '/indicatorsMng',
        redirect: '/indicatorsMng/index',
        name: '模型评价管理',
        children: [{
            path: 'index',
            name: '评价指标管理',
            component: () =>
            import ( /* webpackChunkName: "page" */ '@/views/model/modelEva/indicatorsMng/index'),
        },{
            path: 'evaReport',
            name: '模型评价报表',
            component: () =>
            import ( /* webpackChunkName: "page" */ '@/views/model/modelEva/evaReport/index'),
        },{
            path: 'evaHistory',
            name: '模型评价历史情况',
            component: () =>
            import ( /* webpackChunkName: "page" */ '@/views/model/modelEva/evaHistory/index'),
        }]
    }]
}]
