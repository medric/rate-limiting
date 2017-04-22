// @flow 
import React from 'react';

type Props = { tasks: [] };
type State = { /* */ };

export default class Task extends React.Component<void, Props, State> {
    constructor(props: Props) {
        super(props);
        this.props = props;
    }   

    render() {
        return (
            <div></div>
        )
    }
}