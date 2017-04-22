// @flow 
import React from 'react';

type Props = { tasks: [] };
type State = { /* */ };

export default class TasksList extends React.Component<void, Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.props = props;
    } 

    render() {
        return (
            <ul>
                {
                    this.props.tasks.map((task) => 
                        <li>{task.name}</li>
                    )
                }
            </ul>
        );
    }
}