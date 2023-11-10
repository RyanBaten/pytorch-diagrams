import { useState } from "react";
import * as React from "react";

interface EditableLabelProps {
  default: string;
  className?: string;
}

interface EditableLabelState {}

export class EditableLabel extends React.Component<
  EditableLabelProps,
  EditableLabelState
> {
  constructor(props: EditableLabelProps) {
    super(props);
    this.state = { content: props.default };
  }

  render() {
    return (
      <div
        className={this.props.className}
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(event) => {
          var newText = event.target.innerText.replace(/\n/g, "");
          if (newText == "") {
            newText = this.props.default;
          }
          this.setContent(newText);
          event.target.innerText = newText;
        }}
      >
        {this.getContent()}
      </div>
    );
  }

  getContent() {
    return this.state["content"];
  }

  setContent(content: string) {
    this.state["content"] = content;
  }
}
