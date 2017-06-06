import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

export default createWidget('profile-t', {
  tagName: 'div.user-profile.widget-container',
  buildKey: (attrs) => 'user-profile',

  html(attrs, state) {
    const { currentUser } = this;
    let contents = []
    if (currentUser) {
      const username = currentUser.get('username');
 
    contents.push(
      
    h('li', this.attach('link', {
     route: 'user',
     model: currentUser,
     className: 'menu-profile',
     rawLabel: username
          })),  
      
    h('li', this.attach('link', {
      className: 'menu',
      label: 'main.qa-you',
      href: 'http://toxu.ru/posted'
          })),
 
  
    h('li', this.attach('link', {
      className: 'menu',
      label: 'main.bookmark-you',
      href: 'http://toxu.ru/bookmarks'
          }))  

         
          );
   
} 

return h('div.sidebar-menu', contents);
}

});
