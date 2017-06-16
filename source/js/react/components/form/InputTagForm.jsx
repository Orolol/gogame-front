import React                        from 'react';
import ReactDOM                     from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import { translate }                from 'react-i18next';


class InputTagForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tags: this.props.tags
              ? this.props.tags.map(function (tag,rk) { return { id:rk+1, text:tag } })
              : [],
            suggestions: this.props.suggestions
        }
        this.handleDelete   = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag     = this.handleDrag.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            suggestions: nextProps.suggestions,
            tags: nextProps.tags
              ? nextProps.tags.map(function (tag,rk) { return { id:rk+1, text:tag } })
              : [],
        });
    }

    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);

        this.setState({tags: tags});
        this.props.handleChange(tags.map( function(tag){ return tag.text; } ), this.props.field, false);
    }

    handleAddition(tag) {
        let tags = this.state.tags;

        if (this.props.onlySugggestionAuthorized) {
            let tagBelongsToSuggestion = this.props.suggestions.find(function(suggestion) { return suggestion == tag; });
            if ( !tagBelongsToSuggestion)
                return;
        }
        let texts = tags.length
          ? tags.map( function(tag){ return tag.text; } )
          : [];
        if ( texts.indexOf(tag) < 0 ) {
          tags.push({
            id: tags.length + 1,
            text: tag
          });
          this.setState({tags: tags});
          this.props.handleChange(tags.map( function(tag){ return tag.text; } ), this.props.field, false);
        }
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: tags });
    }

    render() {
        let tags = this.state.tags;
        let suggestions = this.state.suggestions;
        return (
            <div>
                <ReactTags autofocus= {false}
                    tags            = {tags}
                    suggestions     = {suggestions}
                    handleDelete    = {this.handleDelete}
                    handleAddition  = {this.handleAddition}
                    handleDrag      = {this.handleDrag}
                    readOnly        = {this.props.readOnly}
                 />
            </div>
        )
    }
}

export default (InputTagForm);
