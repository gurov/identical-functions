(function () {

    const rbuz = (test) => {
    
        function apple(t) {
            return t + 3;
        }
        
        const aa = 1;
        const b1 = () => 2;
    
        // comment
        return aa + b1() + apple(test);
    }

 })();



const rbuz = (test) => {
    
    function apple(t) {
        return t + 3;
    }
    
    const aa = 1;
    const b1 = () => 2;

    // comment
    return aa + b1() + apple(test);
}


function hello() {
    
    function test () {
        return 'ttt';
    }
    return 'world';
}