function ControllerForm () {
    const handleSubmit = () => {}

    return (    <form>
        <label>Input Theta:</label>
        <input type="text" id="theta" ></input>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>)
}

export default ControllerForm