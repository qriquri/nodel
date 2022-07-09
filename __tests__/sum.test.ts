import { sum } from "../src/sum"

describe('数字の足し算ができる', () =>{
    test('1と2を足したら3になる', () => {
        // 前が実測値、後ろが期待値
        expect(sum(1, 2)).toEqual(3)
    })
} )