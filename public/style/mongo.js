//conecxao com mongodb
var mongoose =require('mongoose');

mongoose.connect('mongodb://10.88.112.38:27017');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log("conectado");
// body...
});


//cria nova tabela campos e atributos
var novoSchema = mongoose.Schema({nome: String , codigo: String});


var novo = mongoose.model('novo', novoSchema);

//variavel para receber dados e inserir no banco

var nome1= "Bruno";
var codigo1= "69"; //["a","b","c","d"];



if(nome1 !=0 && codigo1 !=0){

function insert(nome1, codigo1) {
// body...



//faz o insert atraves de variavel

var item1 = new novo({nome: nome1, codigo: codigo1});

console.log(item1.nome, item1.codigo);


item1.save(function(err, item1){
if(err)
return console.error(err);



});

}


insert(nome1, codigo1);

}else {
console.log("erro");

}


//atualiza atravez do campo nome:



// body...
function upd() {
// body...

novo.findOneAndUpdate({nome:'1'}, {$set: {codigo:'gg4'}},function(err){
return console.error(err);
});
}
upd();
