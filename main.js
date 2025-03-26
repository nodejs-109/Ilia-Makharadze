console.log(0);//1

setImmediate(() => {
  console.log(1)
})

setTimeout(() => {
  console.log(2);
}, 10);

setTimeout(() => {

  Promise.resolve().then(() => {
    console.log(3);
  });

  setTimeout(() => {
    console.log(4);
	setTimeout(() => {
		console.log(5);
	});
  }, 10);

  process.nextTick(() => {
    setTimeout(() => {
      console.log(6);
    }, 0)
    console.log(7)
  });

}, 1000);

console.log(8);//2

process.nextTick(() => {
	console.log(9);
});


//პირველი სრულდება console.log ფუნქციის გარეთ მყოფები რადგან პირდაპირ call stack-ში ხვდებიან. შემდეგ შესრულდებ next.Tick() call stackis შემდეგ,
//  მაგრამ ივენთ ლუპზე ადრე. setImmediate ეშვება setTimeout-მდე

//0 8 9 1 setImmediate გაეშვა და პირველი რომელიც შემოვიდარიგში იმაზე გადავ ანუ setTimeout-ze 2  7 იცდიდა next.Tick() 3 6  ყველაზე ბოლოს მივა setTimout-ზე ჩადგმული სადაცაა 4 5