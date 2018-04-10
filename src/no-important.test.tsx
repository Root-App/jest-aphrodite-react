import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import * as reactTestRenderer from 'react-test-renderer';
import { aphroditeSerializer } from './no-important';

expect.addSnapshotSerializer(aphroditeSerializer);

const Wrapper: React.SFC = props => {
  const styles = StyleSheet.create({
    wrapper: {
      background: 'papayawhip',
      padding: '4em',
    },
  });
  return <section className={css(styles.wrapper)} {...props} />;
};

const Title: React.SFC = props => {
  const styles = StyleSheet.create({
    title: {
      color: 'palevioletred',
      fontSize: '1.5em',
      textAlign: 'center',
    },
  });
  return <h1 className={css(styles.title)} {...props} />;
};

test('react-test-renderer', () => {
  const tree = reactTestRenderer
    .create(
      <Wrapper>
        <Title>
          Hello World, this is my first component styled with aphrodite!
        </Title>
      </Wrapper>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('no-important exports match default package exports', () => {
  const defaultExports = require('.');
  const noImportantExports = require('./no-important');
  expect(Object.keys(defaultExports)).toEqual(Object.keys(noImportantExports));
});
