import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageHome' });
  }
});

FlowRouter.route('/todos', {
  name: 'public.todos',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageTodos' });
  }
});

FlowRouter.route('/about', {
  name: 'public.about',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageAbout' });
  }
});

FlowRouter.route('/working', {
  name: 'public.working',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageWorking' });
  }
});

FlowRouter.route('/chat', {
  name: 'public.chat',
  //! BUNU YORUM SATIRINA ALDIK ÇÜNKÜ CHAT SAYFASININ İÇ KISMINA GİRİŞ ZORUNLULUĞU EKLEYECEĞİM
  // triggersEnter: [MustSignIn], 
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageChat' });
  }
});

FlowRouter.route('/classes', {
  name: 'public.classes',
  triggersEnter: [MustSignIn], //? GİRİŞ YAPMA ZORUNLULUĞU VAR
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageClasses' });
  }
});