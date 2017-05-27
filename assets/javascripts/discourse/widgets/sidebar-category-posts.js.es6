import { createWidget } from 'discourse/widgets/widget';
import { getLatestPosts } from 'discourse/plugins/discourse-sidebar-blocks/discourse/helpers/get-latest-posts';
import { categoryBadgeHTML } from 'discourse/helpers/category-link';
import RawHtml from 'discourse/widgets/raw-html';
import { h } from 'virtual-dom';

export default createWidget('sidebar-category-posts', {
  tagName: 'div.sidebar-category-posts',
  buildKey: attrs => `sidebar-category-posts-${attrs.category || attrs.tag}`,
  defaultState() {
    return { loading: false };
  },
  buildClasses(attrs) {
    const result = [];
    if (attrs.category) { result.push(`sidebar-c-${attrs.category}`); };
    if (attrs.tag) { result.push(`sidebar-tag-${attrs.tag}`); };
    return result;
  },

  refreshTopics() {
    if (this.state.loading) { return; }
    this.state.loading = true
    this.state.topics = 'empty'
    getLatestPosts(this).then((result) => {
      for (var i = result.length - 1; i >= 0; i--) {
        // remove archived posts
        if (result[i].archived) {
          result.splice(i, 1);
        }
      }

      if (result.length) {
        var max = parseInt(this.siteSettings.sidebar_num_results) - 1;
        for (var i = result.length - 1; i >= 0; i--) {
          if (i > max) {
            result.splice(i, 1);
          }
        }
        this.state.topics = result;
      } else {
        this.state.topics = 'empty'
      }
      this.state.loading = false
      this.scheduleRerender()
    })
  },

  html(attrs, state) {
    if (!state.topics) {
      this.refreshTopics();
    }
    const result = [];
    var heading = '';
    if (attrs.category) {
      var category = Discourse.Category.findBySlug(attrs.category);
      var heading = categoryBadgeHTML(category);
      result.push(h('div', {innerHTML: heading}));
    }

    if (attrs.tag) {
      result.push(h('h3.sidebar-heading', {innerHTML: attrs.tag}));
    }

    if (state.loading) {
      result.push(h('div.spinner-container', h('div.spinner')));
    } else if (state.topics !== 'empty') {
      var tpl = 'sidebar-post-item';
      if (attrs.thumbnails) {
        var tpl = 'sidebar-post-item-thumbnail';
      }
      const topicItems = state.topics.map(t => this.attach(tpl, t));
      result.push(h('div', [topicItems]));
    } else {
      result.push(h('div.no-messages', 'No posts in this category.'))
    }

    return result;
  },

});
