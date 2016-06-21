import React from 'react';
import MobileTearSheet from './MobileTearSheet.jsx'
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

const DashboardList = () => (
  <MobileTearSheet>
    <List>
      <h1><Subheader inset={true}>Actions</Subheader></h1>
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        rightIcon={<ActionInfo />}
        primaryText="Contact Driver"
        secondaryText="Jan 9, 2016"
      />
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        rightIcon={<ActionInfo />}
        primaryText="Contact Passenger"
        secondaryText="Jan 17, 2016"
      />
    </List>
    <Divider inset={true} />
    <List>
      <Subheader inset={true}>Files</Subheader>
      <ListItem
        leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
        rightIcon={<ActionInfo />}
        primaryText="Successful Rides"
        secondaryText="Jan 20, 2016"
      />
      <ListItem
        leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={yellow600} />}
        rightIcon={<ActionInfo />}
        primaryText="Messages"
        secondaryText="Jan 10, 2016"
      />
    </List>
  </MobileTearSheet>
);

export default DashboardList;