import Swal from 'sweetalert2';

Template.publicPageTodos.onCreated(function () {
  // Genel state (şimdilik boş ama ileride kullanılabilir)
  this.state = new ReactiveDict(null, {
    todos: [], //? letin içinde tanımlanan todos
    notFound: false,
  });

  // Sayfalama bilgileri
  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 5,
    totalCount: 0,
    totalPages: 0,
  });

  // Sıralama bilgileri
  this.sorting = new ReactiveDict(null, {
    sortField: 'name',
    sortOrder: 'asc',
  });

  // Filtreleme bilgileri (şimdilik boş)
  this.filtering = new ReactiveDict(null, {});
});


Template.publicPageTodos.onRendered(function () {
  const self = this;

  self.subscribeTodos = Meteor.subscribe('todos.list');

  this.autorun(function () {
    AppUtil.refreshTokens.get('todos'); //? todo eklemeden sonra sayfayı yenilemek için
    const pageItems = self.pagination.get('pageItems');
    const currentPage = self.pagination.get('currentPage');
    const obj = {
      options: {
        pagination: {
          currentPage: 1,
          pageItems: 12,
        },
      },
    };

     Meteor.call('todos.list', obj, function (error, result) {

    if (error) {
      // todo error handling
      console.error('Error fetching todos:', error);
      return;
    }

    self.state.set('todos', result.todos);
    // Eğer hiçbir sonuç yoksa, "notFound" durumunu true yap
    self.state.set('notFound', result.options.pagination.totalCount === 0);
    // Sayfalama bilgilerini ayarla
    self.pagination.set('currentPage', result.options.pagination.currentPage);
    self.pagination.set('pageItems', result.options.pagination.pageItems);
    self.pagination.set('totalCount', result.options.pagination.totalCount);
    self.pagination.set('totalPages', result.options.pagination.totalPages);
  });
  });
});

Template.publicPageTodos.events({
  'click .brd-todo-create': function (event, template) {
    template.$('#brdPublicModalTodoCreateModal').modal('show');
    //? todo-create den id yi çağırıyoruz
  },
  'click .brd-todo-delete': function (event, template) {
  
      const todo = this; //? this ile tek birini seçiyoruz alttali call ın içinde bu todo'yu kullanacağız
  
      //? todo silme işlemi için swal kullanıyoruz swalda dışardan ekstra ekledik
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
          //todostan silme işlemi için todos.delete metodunu çağırıyoruz
          //? todos.delete metodunu server/methods/todos/delete.js dosyasında bulabilirsiniz
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
      const todo = this;
      AppUtil.temp.set('todo', this); //? todo yu temp e set ettik ki modal içine çekebilelim
      template.$('#brdPublicModalTodoUpdateModal').modal('show');
    },
});

Template.publicPageTodos.onDestroyed(function() { 
  this.subscribeTodos ?.stop(); //? sayfa destroy olduğunda subscribe'ı durdur
});
