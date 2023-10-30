const Director = require('../models/director');

function create(req,res,next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    
    let director = new Director({
        name: name,
        lastName: lastName
    });

    // para darle commit por asi decirlo
    director.save().then(obj => res.status(200).json({
        // siempre debe traer estas dos propiedades, el mensaje y el objeto
        msg: "Director creado correctamente", //msg q se le entrega al cliente
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo almacenar el director",
        obj: ex
    }));

}

function list(req,res,next){
    let page = req.params.page? req.params.page :1;
    const options = {
        page: page,
        limit: 5
    };
    Director.paginate({},options).then(objs => res.status(200).json({
        msg: "Lista de directores",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la lista de directores",
        obj: ex
    }));
}

function index(req,res,next){
    const id = req.params.id;
    // se le pasa un criterio a buscar, que es siempre un objeto
    Director.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Director con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo consultar el director ${id}`,
        obj: ex
    }));
}

function replace(req,res,next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let director = new Object({
        _name : name,
        _lastName: lastName
    })  

    // id a buscar, objeto con el que se reemplazará, si no existe lo crea
    Director.findOneAndUpdate({"_id":id}, director, {new: true}).then(obj => res.status(200).json({
        msg: "Director reemplazado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo reemplazar el director ${id}`,
        obj: ex
    }));
}

function update(req,res,next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    
    let director = new Object();
    if (name) director._name = name;
    if (lastName) director._lastName = lastName;

    Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
        msg: "Director actualizado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo reemplazar el director ${id}`,
        obj: ex
    }));

}

function destroy(req,res,next){
    const id = req.params.id;
    Director.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: "Director eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo eliminar el director ${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};
