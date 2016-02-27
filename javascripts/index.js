var requestStream = Rx.Observable.just('http://localhost:5000/data');
requestStream.subscribe(function(reqUrl) {
  var responseStream = Rx.Observable.create(function(observer) {
    fetch(reqUrl).then(data => data.json()).catch(data => data.text()).then(result => { observer.onNext(result) }).catch(error => { observer.onError(error)});
  });

  responseStream.subscribe(function(response) {
    var container = document.querySelector(".container");
    var frag = document.createDocumentFragment();

    console.log(response);

    response.forEach(function(obj) {
      var li = document.createElement("li");
      li.dataset.id = obj.id;
      li.innerHTML = `${obj.name} Friends(${obj.friends.length}) <br/> ${obj.greeting}`;
      frag.appendChild(li);
    });

    container.appendChild(frag);
  })
});
