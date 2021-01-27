import React from 'react';
import classes from './Treeview.css';
import Tree from './Tree/Tree';

const Treeview = () => {
    return (
        <div className='treeview'>
            <Tree treeLabel="Item 1">
                <Tree treeLabel='sub tree 1'>
                    <Tree treeLabel='sub-sub tree 1'>
                        <div className="">Tree content </div>
                    </Tree>
                </Tree>
                <Tree treeLabel='sub tree 2'>
                    <div className="">Tree content </div>
                </Tree>
            </Tree>
        </div>
    );
}

export default Treeview;
