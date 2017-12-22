import React from 'react';
import test from 'ava';
import { Router, Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import 'enzyme';
import sinon from 'sinon';
import AssesmentOfTheses from '../../src/containers/thesis/AssesmentOfTheses';
import store from "../../src/util/store";

const assesment = <AssesmentOfTheses store={store}/>
const wrapper = shallow(assesment);

test.skip('skip this', t => {
    t.truthy(true);
});

/*
test('has a list with something in it', t => {
    t.truthy(wrapper.find('ul').children().length > 0)
    t.truthy(wrapper.find('li').children().length > 0); //not very good way of testing...
});

test('there are three buttons', t => {
    t.is(wrapper.find('button').length, 3);
});

test('clicking language button changes title', t => {
    wrapper.find('#fin').simulate('click');
    t.truthy(wrapper.contains(<h1>Ylempään korkeakoulututkintoon sisältyvän pro gradu -tutkielman arviointi</h1>));
    wrapper.find('#en').simulate('click');
    t.truthy(wrapper.contains(<h1>Assessment of Master’s theses included in second-cycle degrees</h1>));
    wrapper.find('#swe').simulate('click');
    t.truthy(wrapper.contains(<h1>Bedömningen av pro gradu-avhandlingen som hör till högre högskoleexamen</h1>));
});

test('clicking language button changes text', t => {
    wrapper.find('#fin').simulate('click');
    t.truthy(wrapper.contains("Tutkielman arvosteluasteikko"));
});
*/
