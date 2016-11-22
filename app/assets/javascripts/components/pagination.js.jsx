
var Pagination = React.createClass({
  handlePaging: function(pageNum) {
  var self = this;
  console.log("queryは" +self.props.query)
  var query = self.props.query;

  $.ajax({
      url: '/api/events/search?page=' + pageNum,
      data: { query: query },
      success: function(data) {
       self.props.handlePaging(data,pageNum);
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  },
  render: function() {
    var o = {
      dataLength:this.props.data,  // Your data's length.
      handler: this.handlePaging,         // Gets called when page is changed. You must implement your own. Otherwise crashes.
      pageSize: 25,      // Max page number to display.
      maxPagerDispNum: 6,                 // (Optional) Max number of 'pager' to display. (default is 3)
      currentPage: this.props.currentPage // Your current page should be set in your state.
    }
    return (
<Pager object={o} />
    )
  }
});