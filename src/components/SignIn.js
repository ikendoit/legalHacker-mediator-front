import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import {connect} from 'react-redux'
import history from '../history'

const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      this.props.form.validateFields( async (err, values) => {
        if (!err) {
          const {first_name, password} = values
          await fetch('http://localhost:8181/login', {
            headers: {
              'Accept': 'application/json',
		          'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              first_name,
              password
            })
          })
            .then(data=> data.json())
            .then(async result => {
              if (!result) {
                message.error('please re-try')
                return
              }
              console.log({result})
              await this.props.setUser(result[0]);
              // odd bug, can't seem to map dispatch in forms.js, gives me null (rematch)
              this.props.history.push('/')
            })
            .catch(error => {
              console.log(error)
            })
          
        }
      });
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.props.user) return null
    return (
      <div>
        <Form 
          onSubmit={this.handleSubmitLogin} 
          style={{
            paddingTop: 180,
            width: '80%',
            paddingLeft: '10%',
          }}
        >
          <FormItem>
            {getFieldDecorator('first_name', {
              rules: [{ required: true, message: 'Please input your first name!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <br />
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
        </Form>
        <Form 
          onSubmit={this.handleSubmitCreate} 
          style={{
            width: '80%',
            paddingLeft: '10%',
          }}
        >
          <FormItem>
            {getFieldDecorator('first_name', {
              rules: [{ required: true, message: 'Please input your first name!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('last_name', {
              rules: [{ required: true, message: 'Please input your last name!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginForm);
