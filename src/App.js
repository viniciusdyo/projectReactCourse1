import logo from './logo.svg';
import './App.css';
import { Component } from 'react/cjs/react.production.min';
import { PostCard } from './components/PostCard';

class App extends Component {

  state = {
    posts: []
  };


  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {

    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');

    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });

    this.setState({ posts: postsAndPhotos });
  }

  /* a key precida ficar no elemento root (<div>) */
  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <div className="posts">
          {posts.map(post => (
            <PostCard post={post} key={post.id}  />
          ))}
        </div>
      </section>

    );
  }
}
export default App;
/* 
class App extends Component { 
// extende o Component
  render() { // método render - seu retorno renderiza o conteúdo na página
    return <h1>Oi</h1>;
  } */

