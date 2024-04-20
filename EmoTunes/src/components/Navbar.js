import React from 'react'
import { Link} from 'react-router-dom'
export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">EmoTunes</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link"  aria-current="page" to="/happy">Happy</Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/angry">Angry</a>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/sad">Sad</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to='/calm'>Calm</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
