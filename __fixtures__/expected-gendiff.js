const expected = [
  {
    group1: {
      operation: '=',
      value: [
        {
          baz: {
            operation: '-',
            value: 'bas',
          },
        },
        {
          baz: {
            operation: '+',
            value: 'bars',
          },
        },
        {
          foo: {
            operation: '=',
            value: 'bar',
          },
        },
        {
          nest: {
            operation: '-',
            value: {
              key: 'value',
            },
          },
        },
        {
          nest: {
            operation: '+',
            value: 'str',
          },
        },
      ],
    },
  },
]

export default expected
