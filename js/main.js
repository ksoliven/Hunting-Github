$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;
        $.ajax({
            url:"https://api.github.com/users/" + username,
            data:{
                client_id:"9aad0ea5e85232e0caf8",
                client_secret:"70d044b67ca9402876efd0f682650a580578da95"
            }
        }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: "9aad0ea5e85232e0caf8",
                    client_secret: "70d044b67ca9402876efd0f682650a580578da95",
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                    <div class="well">
                    <div class="row">
                        <div class="col-md-7">
                        <strong>${repo.name}</strong>: ${repo.description}
                        </div>
                        <div class="col-md-3">
                        <span class ="badge badge-dark"">Forks: ${repo.forks_count}</span>
                        <span class ="badge badge-dark"">Watchers: ${repo.watchers_count}</span>
                        <span class ="badge badge-dark"">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                        <a href="${repo.html_url}" target ="_blank" class= "btn btn-default">Repo Page</a> 
                        </div>
                    </div>
                    </div>
                    `);
                });
            });
        $("#profile").html(`
        <div class ="panel panel=default">
        <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <br>
                <a target="_blank" class="btn btn-primary  btn-block" href="${user.html_url}">View Profile</a>
                </div>
                <div class="col-md-9">
                <span class ="badge badge-dark"">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-dark"">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-dark"">Followers: ${user.followers}</span>
                <span class="badge badge-dark"">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                    <li class="list-group-item">Company: ${user.company}</li>
                    <li class="list-group-item">Website/blog: ${user.blog}</li>
                    <li class="list-group-item">Location: ${user.location}</li>
                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
                </div>
        </div>
        </div>
        <br>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
        `);
        });
    });
});