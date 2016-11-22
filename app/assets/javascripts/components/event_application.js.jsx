var EventApplication = React.createClass({
  getInitialState: function() {

    return { events: [],
    data: [],
    Data: [],
    allEvents: 0,
             sort: "name",
             order: "asc",
             pageNum: 1,
             currentPage: 1,
             query: ""};

  },

  componentDidMount: function() {
  console.log("didmount")

    this.getDataFromApi();


  },

  getDataFromApi: function() {
    var self = this;
    $.ajax({
      url: '/api/events/',
      success: function(data) {
        self.setState({ events: data[0], allEvents: data[1]});
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  },

  handleSearch: function(data,query) {
    this.setState({ events: data[0], allEvents: data[1],query: query});//setStateが呼ばれたらDOMが更新される
  },
  handlePaging: function(data,pageNum) {
          console.log("eventsPageは"+pageNum)
    this.setState({events: data[0], allEvents: data[1],currentPage: pageNum});
  },


  handleAdd: function(event) {
    var events = this.state.events;
    events.push(event);
    this.setState({ events: events });
  },
  handleDeleteRecord: function(event) {
    var events = this.state.events.slice();
    var index = events.indexOf(event);
    events.splice(index, 1);
    this.setState({ events: events });
  },
  handleUpdateRecord: function(old_event, event) {
    var events = this.state.events.slice();
    var index = events.indexOf(old_event);
    events.splice(index, 1, event);
    this.setState({ events: events });
  },
  handleSortColumn: function(name, order) {
  console.log("sortは"+name)
    if (this.state.sort != name) {
      order = 'asc';
    }
    $.ajax({
      url: '/api/events',
      data: { sort_by: name, order: order },
      method: 'GET',
      success: function(data) {
      console.log("sortの"+ data)
        this.setState({ events: data[0], sort: name, order: order });
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot sort events: ', error);
      }
    });
  },


  render: function() {
  console.log("eventsのデータは"+this.state.events)

    return(
      <div className="container">
        <div className="jumbotron">
          <h1>ReactJS Sample</h1>
           <Pagination handlePaging={this.handlePaging}
           data={this.state.allEvents}
           pageNum={this.state.currentPage}
           currentPage={this.state.currentPage}
           query={this.state.query}
             />

<p>stateのpageは{this.state.currentPage}</p>



        </div>
        <div className="row">
          <div className="col-md-4">
            <SearchForm handleSearch={this.handleSearch}
            currentPage={this.state.currentPage} />
          </div>
          <div className="col-md-8">
            <NewForm handleAdd={this.handleAdd} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable events={this.state.events}
                        sort={this.state.sort}
                        order={this.state.order}
                        handleDeleteRecord={this.handleDeleteRecord}
                        handleUpdateRecord={this.handleUpdateRecord}
                        handleSortColumn={this.handleSortColumn} />
          </div>
        </div>
      </div>

    )
  }
});