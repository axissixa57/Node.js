// let myMap = new Map([[1, "a"], [2, "b"], [3, ['c', 'd']]]); // Map {1 => "a", 2 => "b", 3 => [ 'c', 'd' ]}
// console.log(myMap);
// const addE = myMap.get(3)
// myMap.set(3, E.concat('e'))
// console.log(myMap.get(3)); // [ 'c', 'd', 'e' ] 

class EventEmitter {
    constructor() {
        this._listeners = new Map(); // [ ['event', [ () => {}, ... ] ]
    }

    on(event, listener) {
        const eventListeners = this._listeners.get(event) 

        if (eventListeners) {
            this._listeners.set(event, eventListeners.concat(listener)); 
        } else {
            this._listeners.set(event, [listener]);
        }
    }

    emit(event, ...args) {
        const eventListeners = this._listeners.get(event);

        if (eventListeners) {
            eventListeners.forEach(listener => listener(...args));
        }
    }
}

const emitter = new EventEmitter();

emitter.on('event', (...args) => console.log('event', ...args));
emitter.emit('event', 'a', 'b', 'c');
console.log(emitter._listeners.get('event'));

