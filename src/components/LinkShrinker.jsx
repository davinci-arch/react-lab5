import { useForm } from "react-hook-form"
import { useState } from "react";
import axios from "axios";
export default function LinkShrinker() {

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
    } = useForm({
        mode: "onChange"
    });

    const [link, setLink] = useState('');
    const [shortLink, setShortLink] = useState('');

    const onChange = (value) => {
        setLink(value.target.value);
    }

    // https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten
    const sendData = async (data) => {
        const response = await axios.post('https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten', {
            url: data.link
        });
        setShortLink(response.data.result_url)
    }

    return (
        <div className="container">
            <div className="content">
                <h1>Put link address which you want to shorter:</h1>
                <form action="" onSubmit={handleSubmit(sendData)} className="form_shorter">
                    <div className="input_container">
                        <input type="text" value={link}
                            {...register('link', {
                                required: "Field must not be empty!",
                                pattern: {
                                    value: /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[\/#?]?.*$/,
                                    message: "Please, write a correct link"
                                },
                                onChange: onChange,
                            })}
                            className={!errors?.link ? "link_field" : "link_field error_field"} />
                        <span className="error">{errors?.link?.message}</span>
                    </div>

                    <button className="submit_btn">Proceed</button>
                </form>
                <div className="result_link">{shortLink}</div>
            </div>
        </div>
    )
}