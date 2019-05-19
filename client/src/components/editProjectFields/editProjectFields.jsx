import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import { updateProjectDetails } from "../../actions/projects/updateProjectActions";
import { removeProjectDetails } from "../../actions/projects/removeProjectActions";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//Form
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

//Tabs
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

//Table
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
  });

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
      this.props.onChangePage(event, 0);
    };
  
    handleBackButtonClick = event => {
      this.props.onChangePage(event, this.props.page - 1);
    };
  
    handleNextButtonClick = event => {
      this.props.onChangePage(event, this.props.page + 1);
    };
  
    handleLastPageButtonClick = event => {
      this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
      );
    };
  
    render() {
      const { classes, count, page, rowsPerPage, theme } = this.props;
  
      return (
        <div className={classes.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }
  }
  
  TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
  );
  

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textFieldSmall: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    textFieldLarge: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 300,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        marginTop: 20
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    h6: {
        marginBottom: "1rem",
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
    overflowX: 'auto',
    },
});

class TextFields2 extends React.Component {

    constructor() {
        super();
        this.state = {
            errors: {},
            value: 1,
            page: 0,
            rowsPerPage: 5,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.archiveClient = this.archiveClient.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.project);
        const projectData = {
            id: this.state.project._id,
            title: this.state.project.title,
            status: this.state.project.status,
            priority: this.state.project.priority,
            rate: this.state.project.rate,
            timeEst: this.state.project.timeEst,
            dueDate: this.state.project.dueDate,
            category: this.state.project.category,
            notes: this.state.project.notes
        };

        this.props.updateProjectDetails(projectData);
        window.location.href = '/projects'
    };

    archiveClient(event) {
        event.preventDefault()
        console.log(this.state)
        const projectData = {
            id: this.state.project._id
        };
        console.log(projectData)
        this.props.removeProjectDetails(projectData);
        window.location.href = '/projects'
    };

    beginningState(objectFound, event) {
        objectFound.value = objectFound.timeEst * objectFound.rate
        this.setState({ project: objectFound });
        console.log(this.state);
    };

    handleChange = e => {
        this.setState({
            project: Object.assign(
                {},
                this.state.project,
                { [e.target.id]: e.target.value }
            ),
        });
        console.log(e.target.id)
        console.log(e.target.name)
        console.log(e.target.value)
        console.log(this.state.project)
    };

    handleChangeDropdown = e => {
        this.setState({
            project: Object.assign(
                {},
                this.state.project,
                { [e.target.name]: e.target.value }
            ),
        })
        console.log(this.state.project)
    };

    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const { data } = this.props.projects;
        const { page, rowsPerPage } = this.props;

        if (!data) {
            console.log(null)
            return null
        }

        else {
            var a = document.createElement('a');
            a.href = window.location.href;

            var path;
            ['pathname'].forEach(function (k) {
                console.log(k + ':', a[k]);
                console.log(a[k])
                path = a[k]
                return path
            });

            const id = path.replace("/projects/", "");

            var elementPos = data.projects.map(function (x) { return x._id; }).indexOf(id);
            var objectFound = data.projects[elementPos];

            if (!this.state.project) {
                this.beginningState(objectFound);
                return null
            }
            else {

                const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.clients.length - page * rowsPerPage);

                return (

                    <div className={classes.root}>
                    <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChangeTabs}>
                        <Tab label="Item One" />
                        <Tab label="Edit Project" />
                        <Tab label="View Logs" />
                    </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer></TabContainer>}
                    {value === 1 && <TabContainer>
                    <Grid container spacing={24}>
                        <Grid item xs={1} sm={5} md={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item sm={7} lg={9}>
                            <h4>Edit Project</h4>
                            <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">

                                <Grid item xs={12} sm={12} md={4} lg={3}>
                                    <TextField
                                        required
                                        id="title"
                                        label="Title"
                                        value={this.state.project.title}
                                        className={classes.textField}
                                        onChange={this.handleChange}
                                        InputProps={{ disableUnderline: true, }}
                                        margin="normal"
                                    />
                                </Grid>

                                <Grid item xs={6} sm={6} md={3} lg={2}>

                                    <FormControl className={classes.formControl}>
                                        <Select
                                            value={this.state.project.status}
                                            onChange={this.handleChangeDropdown}
                                            name="status"
                                            style={{"marginTop": "26px"}}
                                            input={
                                                <Input
                                                    labelWidth={this.state.labelWidth}
                                                    name="status"
                                                //id="outlined-age-simple"
                                                />
                                            }
                                        >
                                            <MenuItem value="inactive">
                                                inactive
                                            </MenuItem>
                                            <MenuItem value="pending">pending</MenuItem>
                                            <MenuItem value={"in progress"}>in progress</MenuItem>
                                            <MenuItem value={"completed"}>completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6} sm={6} md={3} lg={2}>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            value={this.state.project.priority}
                                            onChange={this.handleChangeDropdown}
                                            style={{"marginTop": "26px"}}
                                            name="priority"
                                            input={
                                                <Input
                                                    labelWidth={this.state.labelWidth}
                                                    name="priority"
                                                //id="outlined-age-simple"
                                                />
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={"low"}>low</MenuItem>
                                            <MenuItem value={"medium"}>medium</MenuItem>
                                            <MenuItem value={"high"}>high</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} style={{ "marginTop": "40px" }}>
                                    <h6>Time + Rate</h6>
                                </Grid>

{/*                                 <Grid item xs={12} sm={6} md={6} lg={3}>
                                    <TextField
                                        id="dueDate"
                                        label="Due Date"
                                        className={classes.textField}
                                        value={this.state.project.dueDate}
                                        onChange={this.handleChange}
                                        InputProps={{ disableUnderline: true, }}
                                        margin="normal"
                                    />
                                </Grid> */}
                                <Grid item xs={12} sm={3} md={2} lg={2}>
                                    <TextField
                                        id="timeEst"
                                        label="Estimated Hours"
                                        className={classes.textFieldSmall}
                                        value={this.state.project.timeEst}
                                        onChange={this.handleChange}
                                        InputProps={{ disableUnderline: true, }}
                                        margin="normal"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3} md={2} lg={2}>
                                <Tooltip title="For fixed-rate projects, leave 0." aria-label="For fixed-rate projects, leave 0.">
                                    <TextField
                                        id="rate"
                                        label="Hourly Rate"
                                        className={classes.textFieldSmall}
                                        value={this.state.project.rate}
                                        onChange={this.handleChange}
                                        InputProps={{ disableUnderline: true, }}
                                        margin="normal"
                                    />
                                </Tooltip>
                                </Grid>

                                <Grid item xs={12} style={{ "marginTop": "40px" }}>
                                    <h6>Notes</h6>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="notes"
                                        multiline
                                        rows="8"
                                        value={this.state.project.notes}
                                        onChange={this.handleChange}
                                        className={classes.textFieldLarge}
                                        margin="dense"
                                    />
                                </Grid>

                                <Grid item xs={6} sm={9} style={{ "marginTop": "30px" }}>

                                    <Button variant="contained" type="submit" size="large" color="primary" className={classes.margin} style={{ "marginTop": 15 }} onClick={this.handleSubmit}>SAVE</Button>

                                </Grid>

                                <Grid item xs={6} sm={3} style={{ "marginTop": "30px" }}>

                                    <Button variant="outlined" type="submit" size="large" color="primary" className={classes.margin} style={{ "marginTop": 15, align: "right" }} onClick={this.archiveClient}>ARCHIVE</Button>

                                </Grid>

                            </form>
                        </Grid>
                    </Grid>
                    </TabContainer>}
                    {value === 2 && <TabContainer>
                        <Grid container spacing={24}>
                        <Grid item xs={1} sm={5} md={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item sm={7} lg={9}>
                                <Table className={classes.table}>
                                    <TableHead id="th">
                                    <TableRow>
                                        <TableCell variant="h5" component="th" scope="row">
                                        Note
                                        </TableCell>
                                        <TableCell variant="h5" component="th" scope="row">Start</TableCell>
                                        <TableCell variant="h5" component="th" scope="row">Stop</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.state.project.logs
                                        .filter(log => { return log.active === true })
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(log => (
                                        <TableRow hover style={{ cursor: 'pointer' }} key={log._id}>
                                            <TableCell id="td" component="th" scope="row">
                                            {log.title}
                                            </TableCell>
                                            <TableCell id="td" component="th" scope="row">{log.createdAt}</TableCell>
                                            <TableCell id="td" component="th" scope="row"> {log.updatedAt}</TableCell>
                                        </TableRow>
                                        ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 48 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                    </TableBody>
                                    <TableFooter>
                                    <TableRow >
                                        <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={6}
                                        count={this.state.project.logs
                                            .filter(log => { return log.active === true }).length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActionsWrapped}
                                        />
                                    </TableRow>
                                    </TableFooter>
                                </Table>
                                {/* </Paper> */}
                            </Grid>
                            </Grid>
                    </TabContainer>}
                </div>
                )
            }
        }
    }
}

TextFields2.propTypes = {
    classes: PropTypes.object.isRequired,
    removeProjectDetails: PropTypes.func.isRequired,
    updateProjectDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    userDetails: state.findUser.userDetails
});


export default connect(
    mapStateToProps,
    { updateProjectDetails, removeProjectDetails }
)(withStyles(styles)(TextFields2))