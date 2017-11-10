import React from 'react';
import test from 'ava';
import {Router, Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ThesisList from '../../src/components/thesis/ThesisList';

const thesisApp = <ThesisList/>
const wrapper = shallow(thesisApp);

test('should have a table element', t => {
    t.is(wrapper.find('table').length, 1);
});

test('should have 1 tr elements in table', t => {
    t.is(wrapper.find('tr').length, 1);
});
