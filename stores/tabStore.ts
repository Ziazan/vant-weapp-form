import { defineStore } from 'pinia';
export const menu = [
	{
		id:'1',
		icon:"home-o",
		label:'标签',
		children:[
			{
				id:'11',
				path:'pages/form/index',
				label:'详情1',
				isTabbarPath:true,
			},
			{
				id:'12',
				path:'pages/detail/index',
				label:'详情2',
				isTabbarPath:true,
			},
		]
	},
	{
		id:'2',
		icon:"search",
		label:'标签',
		children:[
			{
				id:'21',
				path:'pages/cate/index',
				icon:"search",
				label:'标签',
				isTabbarPath:true,
			},
		]
	},
	{
		id:'3',
		path:'pages/user/index',
		icon:"friends-o",
		label:'标签',
		children:[
			
		]
	}
]
// 获取当前页面路径
const getCurrentPagePath = () => {
  const pages = getCurrentPages(); // 获取当前页面栈
  const currentPage = pages[pages.length - 1]; // 当前页面
  return currentPage.route; // 当前页面路径
};

const isCurrentPageInMenuList = (menuList) => {
  const currentPath = getCurrentPagePath(); // 获取当前页面路径
  console.log('currentPath',currentPath)

  // 遍历 menuList const [index, value] of arr.entries()
  for (let [index, menuItem] of menuList.entries()) {
    // 检查 menuItem 的 path 是否命中
    if (menuItem.path === currentPath) {
      return [index, 0]; // 返回命中的菜单项
    }

    // 如果有 children，则递归检查子菜单
    if (menuItem.children && menuItem.children.length > 0) {
      for (let [childIndex, child] of menuItem?.children?.entries()) {
        if (child.path === currentPath) {
          return [index, childIndex]; // 返回命中的子菜单项
        }
      }
    }
  }

  return []; // 如果没有命中路径，返回 null
};

export const useTabStore = defineStore('tabStore', {
	state: () => {
		return {
			tabbarActive: 0,
			subTabActive: 0,
			menu
		};
	},
	actions: {
		setTabbarActive(active: string) {
			this.tabbarActive = active;
		},
		setSubTabActive(active: string) {
			this.subTabActive = active;
		},
		initActive(){
			console.log('initActive');
			const matchedItem = isCurrentPageInMenuList(this.menu);
			console.log('matchedItem',matchedItem)
			if(matchedItem.length){
				this.setTabbarActive(matchedItem[0]);
				this.setSubTabActive(matchedItem[1]);
			}
		}
	},
	getters:{
		currentTabs:(state)=>{
			return state.menu[state.tabbarActive].children ?? [];
		}
	}
});
