from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.decorators import detail_route
from .models import *

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True
            },
        }

class SubAuthorSerializer(serializers.ModelSerializer):
    
    displayName = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name', allow_blank=True, required=False)
    last_name = serializers.CharField(source='user.last_name', allow_blank=True, required=False) 
    email = serializers.CharField(source='user.email', allow_blank=True, required=False) 

    class Meta:
        model = Author
        fields = ('id', 'displayName', 'first_name', 'last_name', 
                  'email', 'bio', 'host', 'github_username')

class CommentSerializer(serializers.ModelSerializer):
    author = SubAuthorSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'publish_time', 'post')

    def create(self, validated_data):
        postId = self.context['request'].parser_context.get('kwargs').get('pk')
        post = Post.objects.get(id=postId)
        author = Author.objects.get(user=self.context.get('request').user)
        comment = Comment.objects.create(author=author,post=post, **validated_data)
        comment.save()
        return comment

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
                  
class PostSerializer(serializers.ModelSerializer):

    author = SubAuthorSerializer(many = False, read_only = True)
    comments = serializers.SerializerMethodField('getComments')

    class Meta:
        model = Post
        fields = ('id', 'title', 'source', 'origin', 'description', 'content',
            'category', 'author', 'visibility', 'publish_time', 'content_type', 'comments')

    def create(self, validated_data):
        author = Author.objects.get(user=self.context.get('request').user)
        post = Post.objects.create(author=author, **validated_data)
        post.save()
        return post
    
    # Returns a list of comments
    def getComments(self, obj):
        commentsQuerySet = Comment.objects.all().filter(post__id=obj.id).order_by('publish_time')[:5]

        serializer = CommentSerializer(commentsQuerySet, many=True)
        return serializer.data

class AuthorSerializer(serializers.ModelSerializer):
    """
    Serializer used for doing author profile related operations.
    """     
    displayName = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name', allow_blank=True, required=False)
    last_name = serializers.CharField(source='user.last_name', allow_blank=True, required=False) 
    email = serializers.CharField(source='user.email', allow_blank=True, required=False) 
    password = serializers.CharField(source='user.password', write_only=True)

    friends = SubAuthorSerializer(many=True, required=False)
    
    request_sent = SubAuthorSerializer(source='get_request_sent', many=True, read_only=True)
    request_received = SubAuthorSerializer(source='get_request_received', many=True, read_only=True)

    class Meta:
        model = Author
        fields = ('id', 'displayName', 'password', 'first_name', 'last_name',
                  'email', 'bio', 'host', 'github_username', 'friends', 'request_sent', 'request_received')

    # # Need to be created as User is a nest object of Author.
    # # Returns an author object with user object as an field after extracting data from json.
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_object = User.objects.create_user(**user_data)
        author = Author.objects.create(user=user_object, **validated_data)
        author.save()
        return author
    
    # For updating author profile, need extract user form it and handle the nested object as well.
    def update(self, author, validated_data):
        user_data = validated_data.pop('user')
        user = author.user
        
        user.username=user_data.get('username', user.username)
        user.password=user_data.get('password', user.password)
        user.first_name=user_data.get('first_name', user.first_name)
        user.last_name=user_data.get('last_name', user.last_name)
        user.email=user_data.get('email', user.email)
        user.save()
        
        author.bio = validated_data.get('bio', author.bio)
        author.host = validated_data.get('host', author.host)
        author.github_username = validated_data.get('github_username', author.github_username)
        author.save()
        
        return author
	
class FriendsWithSerializer(serializers.ModelSerializer):
    """
    Serializer used for doing friend related operations.
    """ 
            
    authors = serializers.SerializerMethodField('getFriends')

    class Meta:
        model = Author
        fields = ['authors']

    # Returns a list of friend's id for an author.
    def getFriends(self, obj):
        query = obj.friends.all().values('id')
        res = []
        for item in query:
            res.append(item.values()[0])
        return res