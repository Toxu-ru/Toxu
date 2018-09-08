import { createWidget } from 'discourse/widgets/widget';
import RawHtml from 'discourse/widgets/raw-html';

export default createWidget('link-top', {
  buildKey: (attrs) => 'link-top',

  html(attrs, state) {
  let contents = []
 // var img;
  var title;
  var slug;
 // var catid;
 // var name;
 // var reply_count;
    
  $.ajax({
  url: "/top/daily.json",
  dataType: 'json',
  async: false,
  success: function(data) {
    
 var topics = data.topic_list.topics;
 
 for (var t = 0; t < topics.length; t++) {
 if(t >2) break;  
 title = topics[t].title;
 slug = topics[t].slug; 
 //catid = topics[t].category_id;
// reply_count = topics[t].reply_count; 
// img = Discourse.Category.findById(catid).uploaded_logo.url;
// name =  Discourse.Category.findById(catid).name;   <img src="${img}" alt="${name}" title="${name}" class="cat-small">
 contents.push( new RawHtml({ html: ` <div class="topic-list-item-sug"><a href="/t/${slug}">${title}</a> <sup>${reply_count}</sup></div>`})); 
   
 }
 }
 });
 return contents;
}});
