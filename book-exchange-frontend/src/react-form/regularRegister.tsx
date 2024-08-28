import { useState } from "react"

type Props = {}

function regularRegister({ }: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ name, email, password });

  }
  return (
    <div className="flex mx-auto">

      <form className="border border-primary px-4 py-2 rounded-md shadow" onSubmit={onSubmit} >
        <div>
          <label htmlFor="name">Name:</label>
          <input value={name} type="text" name="" id="name" onChange={(e) => setName(e.target.value)} />

        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input value={email} type="email" name="" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input value={password} type="password" name="" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default regularRegister