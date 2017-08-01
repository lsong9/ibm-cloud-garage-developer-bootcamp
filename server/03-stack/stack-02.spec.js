const makeStack = () => {
  let queue = [];
  let capacity = 3;
  const setCapacity = (value) => {
    if (value < 0) throw new Error('Capacity must be positive');
    capacity = value;
  };
  const isEmpty = () => queue.length === 0;
  const size = () => queue.length;
  const push = (element) => {
    if (queue.length === capacity) throw new Error('Cannot exceed capacity');
    queue.push(element);
  };
  const pop = () => {
    if (queue.length === 0) throw new Error('Cannot pop when empty');
    return queue.pop();
  };
  return {
    isEmpty,
    setCapacity,
    size,
    push,
    pop
  };
};

let stack;

describe.only('the stack', () => {
  beforeEach(() => {
    stack = makeStack();
  });
  it('starts empty', () => {
    stack.isEmpty().should.be.true();
  });
  it('starts with stack size 0', () => {
    stack.size().should.equal(0);
  });
  it('is not be empty when pushed', () => {
    stack.push();
    stack.isEmpty().should.be.false();
  });
  it('leaves stack size 1 when pushed', () => {
    stack.push();
    stack.size().should.equal(1);
  });
  it('leaves stack empty when pushed and popped', () => {
    stack.push();
    stack.pop();
    stack.isEmpty().should.be.true();
  });
  it('leaves stack size 0 when pushed and popped', () => {
    stack.push();
    stack.pop();
    stack.size().should.equal(0);
  });
  it('overflows', () => {
    (() => {
      stack.push();
      stack.push();
      stack.push();
      stack.push();
    }).should.throw('Cannot exceed capacity');
  });
  it('under-flows', () => {
    (() => {
      stack.pop();
    }).should.throw('Cannot pop when empty');
  });
  it('pops the same one pushed', () => {
    stack.push(1);
    stack.pop().should.equal(1);
  });
  it('pops the same two pushed', () => {
    stack.push(1);
    stack.push(2);
    stack.pop().should.equal(2);
    stack.pop().should.equal(1);
  });
  it('accepts only positive capacity', () => {
    (() => {
      stack.setCapacity(-3);
    }).should.throw('Capacity must be positive');
  });
});
