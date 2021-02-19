rev=$(git log -1 --format=%h)
name="$DOCKER_USERNAME/simload:$rev"
echo "building $name"
docker build --tag $name .

echo "Pushing to dockerhub $name"
docker image push $name
