describe("opcodes from 0x9XXX to 0xCXXX", function () {
    var c8, X, Y, N, NN, NNN;

    beforeEach(function () {
        c8 = chip8();
        c8.initialize();
    });

    it("9XY0: VX == VY then doesn't skip next instruction", function() {
        c8.memory[512] = 0x91;
        c8.memory[513] = 0x30;
        c8.V[1] = 100;
        c8.V[3] = 100;

        c8.emulateCycle();

        expect(c8.pc).toEqual(512+2);
    });

    it("9XY0: VX != VY then skip next instructions -> PC=>516", function() {
        c8.memory[512] = 0x92;
        c8.memory[513] = 0xf0;
        c8.V[2] = 1;
        c8.V[0xf] = 255;

        c8.emulateCycle();

        expect(c8.pc).toEqual(512+2+2);
    });

    it("ANNN: NNN=255 so I should be 0x255",function(){
        c8.memory[512] = 0xA2;
        c8.memory[513] = 0x55;

        c8.emulateCycle();

        expect(c8.I).toEqual(0x255);
    });


});