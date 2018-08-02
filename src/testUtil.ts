import * as enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import * as reactTestRenderer from 'react-test-renderer';
import { render, cleanup } from 'react-testing-library';

export function checkSnapshotForEachMethod(ui: JSX.Element, times: number = 1) {
  const rtrResult = reactTestRenderer.create(ui).toJSON();
  doTimes(times, () => {
    expect(rtrResult).toMatchSnapshot('react-test-renderer');
  });

  const enzymeMethods = ['shallow', 'mount', 'render'];
  enzymeMethods.forEach(method => {
    const tree = (enzyme as any)[method](ui);
    doTimes(times, () => {
      expect(toJson(tree)).toMatchSnapshot(`enzyme.${method}`);
    });
  });

  const { container } = render(ui);
  doTimes(times, () => {
    expect(container.firstChild).toMatchSnapshot('react-testing-library');
  });
  cleanup();
}

function doTimes(times: number, fn: () => any) {
  for (let i = 0; i < times; i += 1) {
    fn();
  }
}
