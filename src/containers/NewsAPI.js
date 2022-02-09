import React from 'react';
import { NEWS_API_KEY } from '../config';
import { Grid, Button, Card, CardContent, CardActions, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


async function getArticles () {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=refuges&apiKey=${NEWS_API_KEY}`);
            const body = await response.json();
            return body.articles;

};

function NewsAPI(){
    const [query, setQuery] = React.useState("");
    const [list, setList] = React.useState(null);

    const search = (e) => {
        e.preventDefault();
        getArticles(query).then(setList);
    };


    return (
        <div>
            <form onSubmit={search}>
                <TextField style={{ padding: 24 }}
                    value={query}
                    placeholder="Search for news"
                    margin="normal"
                    onChange={e => setQuery(e.target.value)}

                />
            </form>
            <Grid container spacing={24} style={{ padding: 24 }}>
                {!list
                    ? null
                    : list.length === 0
                        ? <p><i>No results</i></p>
                        : <ul>
                            {list.map((item, i) => (
                                <Item key={i} item={item} />
                            ))}
                        </ul>
                }

            </Grid>
        </div>
        );
}

function Item({ item }) {
    const separateWords = s => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
    const formatDate = s => new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    <a href={item.url}></a>{item.name}
                </Typography>
                <Typography component="p">
                    {item.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" href={item.url} target="_blank">
                    Read more
                </Button>
            </CardActions>
        </Card>
    )
}

export default NewsAPI;