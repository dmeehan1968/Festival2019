import clamp from './clamp'

describe("clamp", () => {
  it("clamps at minimum", () => {
    expect(clamp(1,1,100)).toEqual(1)
  });

  it("clamps at max", () => {
    expect(clamp(100,1,100)).toEqual(100)
  });

  it("clamps to min", () => {
    expect(clamp(0,1,100)).toEqual(1)
  });

  it("clamps to max", () => {
    expect(clamp(101,1,100)).toEqual(100)
  });

});
