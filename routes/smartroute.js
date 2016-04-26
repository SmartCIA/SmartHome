module.exports = function(app) {
    
    
    toggle_relay_connect_all = function(req, res) {
            console.log("GET - /relay_connect_all");
            app.relay_connect_allController();
            return res.send({ status: 'OK' });
    };

    toggle_relay_bathroom = function(req, res) {
            console.log("GET - /relay_bathroom");
            app.relay_bathroomController();
        return res.send({ status: 'OK' });
    };
    
    toggle_relay_kitchen = function(req, res) {
            console.log("GET - /relay_kitchen");
            app.relay_kitchenContoller();
        return res.send({ status: 'OK' });
    };
    
    toggle_relay_bedroom = function(req, res) {
            console.log("GET - /relay_bedroom");
            app.relay_bedroomContoller();
        return res.send({ status: 'OK' });
    };
    
    toggle_relay_room = function(req, res) {
            console.log("GET - /relay_room_lampada1");
            app.relay_roomController();
        return res.send({ status: 'OK' });
    };
    
    toggle_relay_room2 = function(req, res) {
            console.log("GET - /relay_room_lampada2");
            app.relay_room2Controller();        
        return res.send({ status: 'OK' });
    };
    
    toggle_control_curtain = function(req, res) {
            console.log("GET - /control_curtain");
            app.control_curtain();        
        return res.send({ status: 'OK' });
    };
    
    
    app.get('/relay_bathroom', toggle_relay_bathroom);
    app.get('/relay_kitchen', toggle_relay_kitchen);
    app.get('/relay_connect_all', toggle_relay_connect_all);
    app.get('/relay_room_lampada1', toggle_relay_room);
    app.get('/relay_room_lampada2', toggle_relay_room2);
    app.get('/relay_bedroom', toggle_relay_bedroom);
    app.get('/control_curtain', toggle_control_curtain);
}