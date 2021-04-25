(function () {
    const arbuz = (test) => {
        function apple(t) {
            function test () {
                return 'ttt';
            }
            return t + 3;
        }
        const aa = 1;
        const b1 = () => 2;
        // comment
        return aa + b1() + apple(test);
    }
    return arbuz;
 })();
