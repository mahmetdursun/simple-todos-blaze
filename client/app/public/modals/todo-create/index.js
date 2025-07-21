import bootstrap from "bootstrap";

Template.publicModalTodoCreate.onRendered(function() {
  const self = this;

  const modalElement = document.getElementById('brdPublicModalTodoCreateModal');
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener('hidden.bs.modal', function (event) {
    self.$('form#brdPublicModalTodoCreateForm').trigger("reset");
  });
});

Template.publicModalTodoCreate.events({
  'submit form#brdPublicModalTodoCreateForm': function (event, template) {
    event.preventDefault();

    const name = event.target.name.value //? todo-create input nameler çağırıldı
    const description = event.target.description.value

    const obj = {
      //? create.js den todo yu çektik todonun içinde TodoSchema olduğundan oradanda todos.js nin içindeki name ve description ı çağırdık
      todo: {
        name: name,
        description: description,
      }
    }

    Meteor.call('todos.create', obj, function (error, result) {
      if (error) {
        console.log('error', error);
      }


      console.log(result);
      AppUtil.refreshTokens.set('todos', Random.id());
      event.target.reset();
      template.modal.hide();
      $('#brdPublicModalTodoCreateModal').modal('hide'); //?todo ekle kapatmak için
      AppUtil.refreshTokens.set('todos', Random.id()); //? todo eklemeden sonra sayfayı yenilemek için getin karşılığına set kullanıyoruz
    });
  }
});