const globalAny: any = global;

globalAny.document.createRange = () => ({
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  },
  setEnd: () => {},
  setStart: () => {}
});

export default undefined;
