import GlobalActions from 'actions/global';

export default (path, dataBlob, ctx, cb) => {
  const self = ctx;
  const data = dataBlob;
  const {
    dispatch,
  } = self.props;

  self.setState({
    response: null
  });

  Object.keys(self.state)
  .filter(Boolean)
  .filter(key => self.state[key] !== '')
  .forEach((key) => {
    data[key] = self.state[key];
  });

  dispatch(GlobalActions.setLoading(true));
  $.ajax({
    type: 'POST',
    url: path,
    data,
  }).done((response) => {
    dispatch(GlobalActions.setLoading(false));
    self.setState({
      response,
    });
    if (cb) cb(response);
  }).catch((err) => {
    dispatch(GlobalActions.setLoading(false));
    self.setState({
      response: err
    });
  });
};