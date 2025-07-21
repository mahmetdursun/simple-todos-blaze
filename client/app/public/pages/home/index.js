import Swal from 'sweetalert2';

Template.publicPageHome.onCreated(function () {
  this.state = new ReactiveDict(null, {
    todos: [],
    notFound: false,
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 5,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'name',
    sortOrder: 'asc'
  });

  this.filtering = new ReactiveDict(null, {});

  this.number = ReactiveVar(0);
  this.timeout = null;
});

Template.publicPageHome.helpers({
  number: function () {
    return Template.instance().number
  }
});

Template.publicPageHome.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get('todos');
    const currentPage = self.pagination.get('currentPage');
    const pageItems = self.pagination.get('pageItems');
    const filtering = self.filtering.all();
    const sorting = self.sorting.all();

    const obj = {
      options: {
        pagination: {
          currentPage: currentPage,
          pageItems: pageItems
        },
        filtering: filtering,
        sorting: sorting,
      }
    }

    console.log(obj);

    Meteor.call('todos.list', obj, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {

        self.state.set('todos', result.todos);
        self.state.set("notFound", result.options.pagination.totalCount === 0);
        self.pagination.set("currentPage", result.options.pagination.currentPage);
        self.pagination.set("pageItems", result.options.pagination.pageItems);
        self.pagination.set("totalCount", result.options.pagination.totalCount);
        self.pagination.set("totalPages", result.options.pagination.totalPages);
      }
    });
  });
});

Template.publicPageHome.events({
  'click .brd-delete': function (event, template) {

    const todo = this;

    Swal.fire({
      title: 'Silmek istiyor musunuz?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-danger)',
      cancelButtonColor: 'var(--bs-dark)',
      cancelButtonText: 'Hayır',
      confirmButtonText: 'Evet'
    }).then((result) => {
      if (result.value) {

        Loading.show();
        Meteor.call('todos.delete', { _id: todo._id }, function (error, result) {
          Loading.hide();

          if (error) {
            console.log('error', error);
          }

          AppUtil.refreshTokens.set('todos', Random.id());
        });
      }
    });

  },
  'click .brd-update': function (event, template) {

    const todo = this;

    AppUtil.temp.set('todo', this);

  },
  'click .brd-todo-remove': function (event, template) {
    event.preventDefault();

    const todo = this.data;

    Swal.fire({
      title: 'Silmek istiyor musunuz?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-danger)',
      cancelButtonColor: 'var(--bs-dark)',
      cancelButtonText: 'Hayır',
      confirmButtonText: 'Evet'
    }).then((result) => {
      if (result.value) {

        Loading.show();
        Meteor.call('todos.delete', { _id: todo._id }, function (error, result) {
          Loading.hide();

          if (error) {
            console.log('error', error);
          }

          AppUtil.refreshTokens.set('todos', Random.id());
        });
      }
    });

  },
  'click .brd-todo-update': function (event, template) {
    event.preventDefault();
    const todo = this;

    AppUtil.temp.set('todo', this.data);
    $('#brdPublicModalTodoUpdateModal').modal('show');
  },
  'keyup .brd-todo-search, input .brd-todo-search': function (event, template) {
    event.preventDefault();

    const search = event.target.value;

    if (template.timeout) {
      clearTimeout(template.timeout);
    }

    template.timeout = setTimeout(function () {
      template.filtering.set('name', search);
      template.pagination.set('currentPage', 1);
    }, 700);

  },
  'change .brd-todo-sorting': function (event, template) {
    event.preventDefault();

    const value = event.target.value;
    const obj = {
      sortField: '',
      sortOrder: ''
    }

    switch (value) {
      case '1':
        obj.sortField = 'name';
        obj.sortOrder = 'asc';
        break;
      case '2':
        obj.sortField = 'name';
        obj.sortOrder = 'desc';
        break;
      case '3':
        obj.sortField = 'description';
        obj.sortOrder = 'asc';
        break;
      case '4':
        obj.sortField = 'description';
        obj.sortOrder = 'desc';
        break;
    }

    template.pagination.set('currentPage', 1);
    template.sorting.set(obj);
  }
});

Template.publicPageHome.onDestroyed(function () {

});




// const car = [{name: 'Tesla', model: 'Model S'},{name: 'BMW', model: 'E30'}]; // mindex.html de kullandık


// // ! name dediği kısım pages/home/index.html deki template name ile eşleşiyor

// Template.pagesHome.onCreated(function () { //? template çalıştırıldığında
//   const self = this;

//   this.name = "Ahmet"; //? template içinde kullanılacak değişkeni tanımladık
//   console.log(this.data);

//   // this.data = this.data || {}; //? data değişkenini tanımladık, eğer data yoksa boş bir obje olarak tanımladık
//   // this.data.name = "Selim"; //? template içinde kullanılacak data değişkenini tanımladık
//   // console.log(this.data);
// });

// Template.pagesHome.onRendered(function () { //? template render edildiğinde
//   const self = this;
// });

// Template.pagesHome.onDestroyed(function () { //? template html den kaybolunduğunda
//   const self = this;

// });

// Template.pagesHome.helpers({ //? template fonksiyonlarını dışarıya açar
//   upperCase: function (name) {  
//     const self = Template.instance(); //? template instance'ını alır
//     return name ?.toUpperCase(); //? name değişkenini büyük harfe çevirir
//   },
//   eq: function (a, b) { //? a ve b değişkenlerini karşılaştırır
//     return a === b; //? eğer a ve b eşitse true döner
//   },
// });

// Template.pagesHome.events({ //? template içindeki olayları dinler
//   'click .brd-btn-click': function (event, template) {
//     alert("Butona tıklandı!"); //? butona tıklandığında alert gösterir
//     event.preventDefault(); //? olayın varsayılan davranışını engeller
//     console.log(event); //? olay nesnesini konsola yazdırır
//     console.log(template); //? template nesnesini konsola yazdırır
//   },
// });

// const Template1 = {
//   pagesHome: {
//     name: "Ahmet",
//     data:{ //? pages/home/index.html içinde template karşılık gelir
//       name: "Selim", 
//     }, 
//   },
// };